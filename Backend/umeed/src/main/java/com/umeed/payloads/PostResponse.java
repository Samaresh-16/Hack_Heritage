package com.umeed.payloads;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostResponse {
	
	private List<PostDto> list;
	private boolean isFirstPage;
	private int pageNumber;
	private int pageSize;
	private long totalElements;
	private int totalpages;
	private boolean isLastPage;
	

}
